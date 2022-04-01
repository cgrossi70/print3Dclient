export interface SystemPackage {
  package_count:  number
  package_list:   string[]
}

export interface CommitBehinds {
  sha: string
  author: string
  date: string
  subject: string
  message: string
  tag: string | null
} 

export interface GitPackage {
  configured_type: string
  detected_type: string
  channel: string
  need_channel_update: boolean
  pristine: boolean
  owner: string
  branch: string
  remote_alias: string
  version: string
  remote_version: string
  full_version_string: string
  current_hash: string
  remote_hash: string
  is_valid: boolean
  is_dirty: boolean
  detached: boolean
  debug_enabled: boolean
  commits_behind: CommitBehinds[]
  git_messages: string[]
  info_tags: string[]
}

export interface WebPackage{
  channel: string
  configured_type: string
  name: string
  owner: string
  version: string
  remote_version: string
  info_tags: string[]
}

export interface UpdateState {
  updates: {
    busy:boolean | null
    github_rate_limit: number  | null
    github_requests_remaining: number | null
    github_limit_reset_time: number | null
    version_info: {[key: string]: WebPackage | GitPackage | SystemPackage}
  }
  updateMessages: string[],
}