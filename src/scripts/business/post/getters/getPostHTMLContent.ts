import * as marked from 'marked';

import { Post } from '@/restful';

marked.setOptions({
    'baseUrl': null,
    'breaks': false,
    'gfm': true,
    'headerIds': true,
    'headerPrefix': '',
    'highlight': null,
    'langPrefix': 'language-',
    'mangle': true,
    'pedantic': false,
    'sanitize': false,
    'sanitizer': null,
    'silent': false,
    'smartLists': false,
    'smartypants': false,
    'tables': true,
    'xhtml': false
});

export const getPostHTMLContent = (post: Post) => {
    if (!post.content) {
        return 'No content!';
    }

    return marked(post.content);
};