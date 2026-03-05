type Language = {
  color?: string;
  id: string;
  name: string;
};

type License = {
  id: string;
  key: string;
  name: string;
  spdxId?: string;
  url?: string;
};

type Repository = {
  createdAt: string;
  id: string;
  name: string;
  nameWithOwner: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  description?: string;
  homepageUrl?: string;
  licenseInfo?: License;
  primaryLanguage?: Language;
  pushedAt?: string;
};

type UserPinnedItemsTotalCountResponse = {
  user: { pinnedItems: { totalCount: number } };
};

type UserPinnedItemsNodesResponse = {
  user: {
    pinnedItems: {
      nodes: Repository[];
    };
  };
};

export {
  type Repository,
  type UserPinnedItemsTotalCountResponse,
  type UserPinnedItemsNodesResponse,
};
