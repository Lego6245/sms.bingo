import remark from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';
import toc from 'remark-toc';
import slug from 'remark-slug';
import img from 'remark-embed-images';
import frontmatter from 'remark-frontmatter';

export default async function markdownToHtml(markdown) {
    const result = await remark()
        .use(frontmatter, ['yaml'])
        .use(toc)
        .use(slug)
        .use(img)
        .use(gfm)
        .use(html)
        .process(markdown);
    return result.toString();
}
