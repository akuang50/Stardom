import type { Group } from "../../types/group";
import type { Song } from "../../types/song";
import { AlbumArt } from "../Shared/AlbumArt";

export function SocialFeed({ group, song }: { group: Group; song?: Song }) {
  const posts = [
    {
      account: `@${group.name.replace(/\s+/g, "")}_OFFICIAL`,
      body: `NEW ERA. ${group.eraName}.`,
      likes: "284K",
      comments: "18K",
    },
    {
      account: `@${group.fandomName}`,
      body: `${group.slogan}`,
      likes: "91K",
      comments: "4.2K",
    },
  ];
  return (
    <section className="grid gap-3">
      {posts.map((post) => (
        <article key={post.account} className="glass rounded-3xl p-4">
          <p className="text-sm font-semibold">{post.account}</p>
          <p className="mt-2 text-lg">{post.body}</p>
          {song ? (
            <div className="mt-3 overflow-hidden rounded-2xl">
              <AlbumArt song={song} group={group} className="h-40 w-full object-cover" />
            </div>
          ) : null}
          <p className="mt-3 text-xs text-mist/55">❤️ {post.likes} · 💬 {post.comments}</p>
        </article>
      ))}
    </section>
  );
}
