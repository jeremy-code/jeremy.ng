---
title: GnuPG Permissions Configuration
lede: Fix GnuPG warning on incorrect permissions
authors:
  - name: Jeremy Nguyen
tags:
  - gpg
  - shell
mastodonId: "117166064396114535"
---

<!-- Originally posted on https://gist.github.com/jeremy-code/79e1f1b58a03ae4c70be49c214eca190 -->

TL;DR: If you receive the warning, `WARNING: unsafe ownership on homedir '$HOME/.gnupg'` from `gpg`, run the following commands to make it go away:

```shell
# Make the current user the owner of the GPG homedir and the GPG config file
sudo chown $USER ${GNUPGHOME:-$HOME/.gnupg} ${GNUPGHOME:-$HOME/.gnupg}/gpg.conf

# Set directory to allow only the user to read, write and execute
chmod u=rwx,go= ${GNUPGHOME:-$HOME/.gnupg} # 700 (rwx------)

# Set config file to allow only the user to read and write
chmod u=rw,go= ${GNUPGHOME:-$HOME/.gnupg}/gpg.conf # 600 (rw-------)
```

---

Somehow, the permissions for GNU Privacy Guard had been set incorrectly, and it prompted with the warning: `WARNING: unsafe ownership on homedir '$HOME/.gnupg'`.

In GnuPG, by default, if it detects unsafe permissions, it will issue a warning. Unfortunately, I couldn't find much documentation on this behavior besides a brief mention regarding the "--no-permission-warning" option, which disables the warning.[^1]

Taking a closer look at the source code, this check is handled by a [`check_permissions()`](https://dev.gnupg.org/source/gnupg/browse/master/g10/gpg.c$1595-1801) function. The behavior of this is as follows:

The user invoking `gpg` (hereafter "user") must have the correct permissions on the following directories and files:

1. GPG Homedir (`~/.gnupg` by default, or `$GNUPGHOME` if set)

- The owner of the homedir MUST be the user
- The homedir MUST be a directory
- The homedir must have permissions such that group is NOT read/write/execute and other is NOT read/write/execute (i.e. `x00` in octal, `d***------` in symbolic notation)

2. GPG Config (`~/.gnupg/gpg.conf` by default or `$GNUPGHOME/gpg.conf`)

- The owner of the GPG config file MUST be the user or root
- The permissions must be such that:
  - If the file is NOT group or other writable, the enclosing directory must ALSO NOT be group or other writable.
  - If the file IS group or other writable, the enclosing directory must NOT be group or other read/write/executable.

3. Extensions. Same process as the GPG config file

In other words, these two are valid:

```shell
sudo chown $USER ~/.gnupg ~/.gnupg/gpg.conf
chmod u=rwx,go= ~/.gnupg
chmod u=rw,go= ~/.gnupg/gpg.conf
```

```shell
sudo chown $USER ~/.gnupg
sudo chown root ~/.gnupg/gpg.conf
chmod u=rwx,go= ~/.gnupg
chmod ugo=rwx ~/.gnupg/gpg.conf
```

So for a quick fix to this issue, you can run the following:

```shell
# Make the current user the owner of the GPG homedir and the GPG config file
sudo chown $USER ~/.gnupg ~/.gnupg/gpg.conf
# Set directory to allow only the user to read, write and execute
chmod u=rwx,go= ~/.gnupg # 700 (rwx------)
# Set config file to allow only the user to read and write
chmod u=rw,go= ~/.gnupg/gpg.conf # 600 (rw-------)

# OR Custom base dir ($GNUPGHOME)
sudo chown $USER $GNUPGHOME "$GNUPGHOME/gpg.conf"
chmod u=rwx,go= $GNUPGHOME
chmod u=rw,go= "$GNUPGHOME/gpg.conf"
```

However, if you're going to be changing permissions in `~/.gnupg`, you probably should go all the way and set the permissions for everything. In that case, you can do:

```shell
# Make the current user the owner of the GPG homedir and everything in it
sudo chown -R $USER ~/.gnupg
# All files (f) and sockets (s) in ~/.gnupg can only be read and written by the user
find ~/.gnupg -type fs -exec chmod u=rw,go= {} +
# All directories in ~/.gnupg (including itself) can only be read, written, and executed by the user
find ~/.gnupg -type d -exec chmod u=rwx,go= {} +

# OR Custom base dir ($GNUPGHOME)
sudo chown -R $USER "$GNUPGHOME"
find "$GNUPGHOME" -type fs -exec chmod u=rw,go= {} +
find "$GNUPGHOME" -type d -exec chmod u=rwx,go= {} +
```

<!-- Footnotes -->

[^1]: https://www.gnupg.org/documentation/manuals/gnupg/GPG-Configuration-Options.html#index-no_002dsecmem_002dwarning
