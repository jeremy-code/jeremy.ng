import * as z from "zod";

import type { UserBioQuery } from "../../generated/gql/graphql";

type GqlBio = Exclude<Exclude<UserBioQuery["user"], null>["bio"], null>;

const bioSchema = z.toZod<GqlBio>()(z.string());

export { bioSchema };
