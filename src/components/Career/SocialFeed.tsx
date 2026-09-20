import type { Group } from "../../types/group";
import type { Song } from "../../types/song";
import { AlbumArt } from "../Shared/AlbumArt";
import { assetUrl } from "../../lib/utils";

export function SocialFeed({ group, song }: { group: Group; song?: Song }) {
  const posts = [
    {
      account: `@${group.name.replace(/\s+/g, "")}_OFFICIAL`,
      body: `NEW ERA. ${group.eraName}.`,
      likes: "284K",
      comments: "18K",
      image: "concerts/poster.jpg",
    },
    {
      account: `@${group.fandomName}`,
      body: `${group.slogan}`,
      likes: "91K",
      comments: "4.2K",
      image: "concerts/crowd.jpg",
    },
  ];
  return (
    <section className="grid gap-3">
      {posts.map((post, index) => (
        <article key={post.account} className="glass rounded-3xl p-4">
          <p className="text-sm font-semibold">{post.account}</p>
          <p className="mt-2 text-lg">{post.body}</p>
          <div className="mt-3 overflow-hidden rounded-2xl">
            {index === 0 && song ? (
              <AlbumArt song={song} group={group} className="h-40 w-full object-cover" />
            ) : (
              <img src={assetUrl(post.image)} alt="" className="h-40 w-full object-cover" />
            )}
          </div>
          <p className="mt-3 text-xs text-mist/55">❤️ {post.likes} · 💬 {post.comments}</p>
        </article>
      ))}
    </section>
  );
}
