# Writing posts for the News page

The News page (`news.html`, "News" / "Actus") lists posts newest first. Every post is a block of HTML you paste into `news.html`, plus its text in **both** languages in `assets/js/i18n.js`. Nothing else to install or build.

## Steps for every post

1. **Pick a post id**: `YYYY-MM-DD-short-name`, lowercase, no spaces or accents, e.g. `2026-11-08-my-post`. It must be unique. It becomes the post's link: `https://neuilleprime.github.io/news.html#post-2026-11-08-my-post`.
2. **Copy a template** below and replace every `2026-11-08-my-post` with your id (each template uses it 3–6 times; use find-and-replace).
3. **Set the date** in the `<time>` tag: `datetime="2026-11-08"` (machine date, `YYYY-MM-DD`) and the text `8 Nov 2026` (English, day + 3-letter month + year). The French date is generated automatically.
4. **Paste the block in `news.html`** right below the comment `<!-- NEW POSTS GO HERE … -->`, which sits just inside `<ol class="feed__list" role="list" data-feed>`, so the newest post is first. Posts pasted above that `<ol>` line show a stray bullet and lose their spacing; the check script catches it. The check script fails if a post is newer than the one above it.
5. **Write the text** in the HTML (English) and add the matching keys to `i18n.js`: once in the `en` part, once in the `fr` part (French uses "tu"). The English in the HTML must match the `en` value exactly. Put them right after the `/* ---- news ---- */` keys.
6. **Images** go in `assets/img/posts/` as `.webp` (or `.jpg`/`.png`), under 150 KB. Wide images: 1200 px wide. Gallery images: about 800 px wide. Put the real width and height in the `<img>` tag (any proportional pair, e.g. `1200`/`675`).
7. Run `node scripts/check.mjs`, then commit and push:
   ```bash
   git add -A
   git commit -m "News: <title>"
   git push
   ```

Good to know:
- More paragraphs: copy a `<p data-i18n="post.2026-11-08-my-post.p1">` line, number it `p2`, `p3`… and add the matching keys.
- More than 10 posts: the 11th and older ones hide behind an "Older posts" button automatically. A direct link to an older post still opens it.
- To remove a post: delete its `<li>…</li>` block in `news.html` and its keys in both parts of `i18n.js`.
- The 7 examples in `news.html` are commented out (`<!-- EXAMPLE: … -->`). To preview one locally, remove its `<!--` and `-->` lines **and** uncomment the matching keys block in `i18n.js` (`/* ---- news: example posts … ---- */`). Comment them again (or delete them) before pushing.
- When there is no visible post, the page shows "No posts yet. Join the Discord to hear things first."

---

## 1. Text only

```html
<li>
  <article class="post" id="post-2026-11-08-my-post" aria-labelledby="post-2026-11-08-my-post-title">
    <p class="post__meta"><a class="label post__date" href="#post-2026-11-08-my-post"><time class="post__time" datetime="2026-11-07">7 Nov 2026</time></a></p>
    <div class="post__content">
      <h2 class="post__title" id="post-2026-11-08-my-post-title" data-i18n="post.2026-11-08-my-post.title">Example: text post</h2>
      <p data-i18n="post.2026-11-08-my-post.p1">This is what a text-only post looks like. Write as many paragraphs as you need; each one is its own key in i18n.js.</p>
      <p data-i18n="post.2026-11-08-my-post.p2">Delete the examples once your first real post is live.</p>
    </div>
  </article>
</li>
```

In the `en` part of `assets/js/i18n.js`:

```js
    "post.2026-11-08-my-post.title": "Your title",
    "post.2026-11-08-my-post.p1": "First paragraph.",
    "post.2026-11-08-my-post.p2": "Second paragraph.",
```

In the `fr` part:

```js
    "post.2026-11-08-my-post.title": "Ton titre",
    "post.2026-11-08-my-post.p1": "Premier paragraphe.",
    "post.2026-11-08-my-post.p2": "Deuxième paragraphe.",
```

## 2. Text + image

The image sits above the text. `alt` describes the picture for people who cannot see it; it is translated through `data-i18n-attr`.

```html
<li>
  <article class="post" id="post-2026-11-08-my-post" aria-labelledby="post-2026-11-08-my-post-title">
    <p class="post__meta"><a class="label post__date" href="#post-2026-11-08-my-post"><time class="post__time" datetime="2026-11-06">6 Nov 2026</time></a></p>
    <div class="post__content">
      <h2 class="post__title" id="post-2026-11-08-my-post-title" data-i18n="post.2026-11-08-my-post.title">Example: text and image</h2>
      <figure class="post__media"><img src="./assets/img/posts/my-image.webp" alt="The NEUILLE PRIME rose on a dark background" data-i18n-attr="alt:post.2026-11-08-my-post.alt" width="1200" height="675" loading="lazy" decoding="async"></figure>
      <p data-i18n="post.2026-11-08-my-post.p1">The image sits above the text and keeps its proportions. Save images in assets/img/posts/, ideally 1200 pixels wide.</p>
    </div>
  </article>
</li>
```

In the `en` part of `assets/js/i18n.js`:

```js
    "post.2026-11-08-my-post.title": "Your title",
    "post.2026-11-08-my-post.alt": "What the image shows",
    "post.2026-11-08-my-post.p1": "First paragraph.",
```

In the `fr` part:

```js
    "post.2026-11-08-my-post.title": "Ton titre",
    "post.2026-11-08-my-post.alt": "Ce que montre l’image",
    "post.2026-11-08-my-post.p1": "Premier paragraphe.",
```

## 3. New YouTube video

Paste the video ID **three times**: in `data-video`, in the `watch?v=` link and in the thumbnail URL. The ID is the part after `v=` in the YouTube link (`https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`), or after `youtu.be/` in short links. The thumbnail loads from YouTube; the player loads only when someone presses play (privacy-friendly `youtube-nocookie.com`). With JavaScript off, the thumbnail is a normal link to YouTube.

```html
<li>
  <article class="post" id="post-2026-11-08-my-post" aria-labelledby="post-2026-11-08-my-post-title">
    <p class="post__meta"><a class="label post__date" href="#post-2026-11-08-my-post"><time class="post__time" datetime="2026-11-05">5 Nov 2026</time></a></p>
    <div class="post__content">
      <h2 class="post__title" id="post-2026-11-08-my-post-title" data-i18n="post.2026-11-08-my-post.title">Example: new video</h2>
      <p data-i18n="post.2026-11-08-my-post.p1">Paste the YouTube video ID and the thumbnail appears on its own. The player only loads when someone presses play.</p>
      <div class="video" data-video="VIDEO_ID">
        <a class="video__link" href="https://www.youtube.com/watch?v=VIDEO_ID" aria-label="Play the video" data-i18n-attr="aria-label:news.play" aria-describedby="post-2026-11-08-my-post-title">
          <img class="video__thumb" src="https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg" alt="" aria-hidden="true" width="480" height="360" loading="lazy" decoding="async">
          <span class="video__play" aria-hidden="true"><svg class="icon" viewBox="0 0 20 20" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 4.5v11l9-5.5z"/></svg></span>
        </a>
      </div>
    </div>
  </article>
</li>
```

In the `en` part of `assets/js/i18n.js`:

```js
    "post.2026-11-08-my-post.title": "New video: your title",
    "post.2026-11-08-my-post.p1": "One or two lines about the video.",
```

In the `fr` part:

```js
    "post.2026-11-08-my-post.title": "Nouvelle vidéo : ton titre",
    "post.2026-11-08-my-post.p1": "Une ou deux phrases sur la vidéo.",
```

The play button's label ("Play the video" / "Lancer la vidéo") is shared by all video posts; nothing to add for it.

## 4. Image gallery

Images are shown in a grid (4:3 crop), not clickable. Add or remove `<li>` lines freely; each image needs its own `alt` key (`alt1`, `alt2`…).

```html
<li>
  <article class="post" id="post-2026-11-08-my-post" aria-labelledby="post-2026-11-08-my-post-title">
    <p class="post__meta"><a class="label post__date" href="#post-2026-11-08-my-post"><time class="post__time" datetime="2026-11-04">4 Nov 2026</time></a></p>
    <div class="post__content">
      <h2 class="post__title" id="post-2026-11-08-my-post-title" data-i18n="post.2026-11-08-my-post.title">Example: gallery</h2>
      <p data-i18n="post.2026-11-08-my-post.p1">A short text, then a grid of images. Add or remove images freely; the grid adapts.</p>
      <ul class="gallery" role="list">
        <li><img src="./assets/img/posts/my-photo-1.webp" alt="The NEUILLE PRIME rose on a dark background" data-i18n-attr="alt:post.2026-11-08-my-post.alt1" width="400" height="300" loading="lazy" decoding="async"></li>
        <li><img src="./assets/img/posts/my-photo-2.webp" alt="Enrtarr's avatar" data-i18n-attr="alt:post.2026-11-08-my-post.alt2" width="400" height="300" loading="lazy" decoding="async"></li>
        <li><img src="./assets/img/posts/my-photo-3.webp" alt="maaple's avatar" data-i18n-attr="alt:post.2026-11-08-my-post.alt3" width="400" height="300" loading="lazy" decoding="async"></li>
        <li><img src="./assets/img/posts/my-photo-4.webp" alt="Poloniums' avatar" data-i18n-attr="alt:post.2026-11-08-my-post.alt4" width="400" height="300" loading="lazy" decoding="async"></li>
      </ul>
    </div>
  </article>
</li>
```

In the `en` part of `assets/js/i18n.js`:

```js
    "post.2026-11-08-my-post.title": "Your title",
    "post.2026-11-08-my-post.p1": "A short text above the photos.",
    "post.2026-11-08-my-post.alt1": "What photo 1 shows",
    "post.2026-11-08-my-post.alt2": "What photo 2 shows",
    "post.2026-11-08-my-post.alt3": "What photo 3 shows",
    "post.2026-11-08-my-post.alt4": "What photo 4 shows",
```

In the `fr` part:

```js
    "post.2026-11-08-my-post.title": "Ton titre",
    "post.2026-11-08-my-post.p1": "Un court texte au-dessus des photos.",
    "post.2026-11-08-my-post.alt1": "Ce que montre la photo 1",
    "post.2026-11-08-my-post.alt2": "Ce que montre la photo 2",
    "post.2026-11-08-my-post.alt3": "Ce que montre la photo 3",
    "post.2026-11-08-my-post.alt4": "Ce que montre la photo 4",
```

## 5. Roster announcements

One card with the person's portrait (or initials block), tag, role and game, plus your text. Three variants; only the card's first line and class change:

| Variant | Card class | Badge (EN / FR) | Badge key |
|---|---|---|---|
| Joins | `move move--join` | Joins / Rejoint | `news.move.join` |
| Leaves | `move move--leave` | Leaves / Quitte | `news.move.leave` |
| Role change | `move move--change` | Role change / Changement de rôle | `news.move.change` |

Badge texts are shared; nothing to add for them. Role names reuse the roster keys: `role.player`, `role.coach`, `role.top`, `role.jungle`, `role.mid`, `role.adc`, `role.bot`, `role.support`, `role.manager`, `role.media`, `role.operations`. Use the portrait file from `assets/img/portraits/` (exact capitalisation), or replace the `<img class="portrait" …>` with `<div class="initials" aria-hidden="true">AB</div>`.

### Joins

```html
<li>
  <article class="post" id="post-2026-11-08-my-post" aria-labelledby="post-2026-11-08-my-post-title">
    <p class="post__meta"><a class="label post__date" href="#post-2026-11-08-my-post"><time class="post__time" datetime="2026-11-03">3 Nov 2026</time></a></p>
    <div class="post__content">
      <h2 class="post__title" id="post-2026-11-08-my-post-title" data-i18n="post.2026-11-08-my-post.title">Example: a player joins</h2>
      <div class="move move--join">
        <img class="portrait" src="./assets/img/portraits/poloniums.webp" alt="" aria-hidden="true" width="96" height="96" loading="lazy" decoding="async">
        <div>
          <p class="label move__badge" data-i18n="news.move.join">Joins</p>
          <p class="move__tag" translate="no">Poloniums</p>
          <p class="label move__role"><span data-i18n="role.top">Top</span> · LoL</p>
        </div>
      </div>
      <p data-i18n="post.2026-11-08-my-post.p1">Use this card when someone joins the roster. Swap the portrait, tag, role and game.</p>
    </div>
  </article>
</li>
```

### Leaves

```html
<li>
  <article class="post" id="post-2026-11-08-my-post" aria-labelledby="post-2026-11-08-my-post-title">
    <p class="post__meta"><a class="label post__date" href="#post-2026-11-08-my-post"><time class="post__time" datetime="2026-11-02">2 Nov 2026</time></a></p>
    <div class="post__content">
      <h2 class="post__title" id="post-2026-11-08-my-post-title" data-i18n="post.2026-11-08-my-post.title">Example: a player leaves</h2>
      <div class="move move--leave">
        <div class="initials" aria-hidden="true">P9</div>
        <div>
          <p class="label move__badge" data-i18n="news.move.leave">Leaves</p>
          <p class="move__tag" translate="no">FormerPlayer</p>
          <p class="label move__role"><span data-i18n="role.player">Player</span> · RL</p>
        </div>
      </div>
      <p data-i18n="post.2026-11-08-my-post.p1">Same card with the Leaves label. A short thank-you usually goes here.</p>
    </div>
  </article>
</li>
```

### Role change (old role → new role)

```html
<li>
  <article class="post" id="post-2026-11-08-my-post" aria-labelledby="post-2026-11-08-my-post-title">
    <p class="post__meta"><a class="label post__date" href="#post-2026-11-08-my-post"><time class="post__time" datetime="2026-11-01">1 Nov 2026</time></a></p>
    <div class="post__content">
      <h2 class="post__title" id="post-2026-11-08-my-post-title" data-i18n="post.2026-11-08-my-post.title">Example: role change</h2>
      <div class="move move--change">
        <img class="portrait" src="./assets/img/portraits/Nikoslaï.webp" alt="" aria-hidden="true" width="96" height="96" loading="lazy" decoding="async">
        <div>
          <p class="label move__badge" data-i18n="news.move.change">Role change</p>
          <p class="move__tag" translate="no">Nikoslaï</p>
          <p class="label move__role"><span data-i18n="role.player">Player</span> → <span data-i18n="role.coach">Coach</span> · RL</p>
        </div>
      </div>
      <p data-i18n="post.2026-11-08-my-post.p1">Shows the old role and the new one side by side.</p>
    </div>
  </article>
</li>
```

Keys for any roster announcement:

In the `en` part of `assets/js/i18n.js`:

```js
    "post.2026-11-08-my-post.title": "Poloniums joins the League of Legends roster",
    "post.2026-11-08-my-post.p1": "One or two lines about it.",
```

In the `fr` part:

```js
    "post.2026-11-08-my-post.title": "Poloniums rejoint l’équipe League of Legends",
    "post.2026-11-08-my-post.p1": "Une ou deux phrases à ce sujet.",
```

Remember to also update `roster.html` (and the counts in the README "Placeholders" section) when someone actually joins or leaves.
