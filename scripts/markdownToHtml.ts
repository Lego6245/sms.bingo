import remark from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';
import toc from 'remark-toc';

export default async function markdownToHtml(markdown) {
    const result = await remark().use(toc).use(gfm).use(html).process(markdown);
    return result.toString();
}
