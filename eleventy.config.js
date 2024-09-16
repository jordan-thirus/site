const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib      
      .use(require('markdown-it-footnote'))
      .use(require('markdown-it-attrs'))
      .use(require('markdown-it-wikilinks')(
        {
          makeAllLinksAbsolute: true, 
          baseURL: '/notebook',
          uriSuffix: ''
        }
      ))
	});

  //add plugins
  eleventyConfig.addPlugin(require("eleventy-plugin-backlinks"), {
		folder: '/notebook'
  });
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
  eleventyConfig.addPlugin(require("@quasibit/eleventy-plugin-sitemap"), {
    sitemap: {
      hostname: "https://jordan.thirus.me",
    },
  });
  eleventyConfig.addPassthroughCopy('assets');

  eleventyConfig.addNunjucksAsyncShortcode("aiRobots", async function() {
    let disallowedAIRobots = await fetch('https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt')
    return await disallowedAIRobots.text()
   });
   	
   eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

  // Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

   eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

    return {
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      dir: {
        layouts: "../_layouts",
        data: "../_data",
        input: "content",
        output: "public"
      },
      passthroughFileCopy: true
    }
  };