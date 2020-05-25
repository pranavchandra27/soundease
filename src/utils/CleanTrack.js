export default function cleanTrack(tracks) {
  if (!Array.isArray(tracks) || tracks.length === 0) return [];
  let newTracks = [];
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].title) {
      newTracks.push({
        id: tracks[i].id,
        duration: tracks[i].duration,
        url: tracks[i].path,
        title: tracks[i].title,
        artist: tracks[i].artist === '<unknown>' ? 'unknown' : tracks[i].artist,
        album: tracks[i].album === '<unknown>' ? 'unknown' : tracks[i].album,
        artwork: tracks[i].cover || null,
        genre: tracks[i].genre,
        index: i,
      });
    }
  }

  return newTracks;
}
