export const extractPlaylistId = (url: string): string | null => {
 const parsedUrl=new URL(url);
 const playlistId=parsedUrl.searchParams.get("list");
 return playlistId??null;
};
