import extract from "md-article"
import md from "../content/test.md"

// # status: unfinished

// This file aims to extract data from markdown file.
// So we can render content into the `Page` component (src/components/rotating-navigation/content.js)
// But I don't have enough time to do it.
// Tools I found now: `md-article`

// How to exract data from markdown file, { keywords: [ 'MDAST', 'RegExp' ] }

// 2022-03-19 02:06

const article = extract(md, "D MMMM YYYY", "en")

export default article
