export interface FetchEventArgs {
    readonly url: string;
    readonly method?: string;
}

export interface DefaultMeta {
    readonly message?: string;
}