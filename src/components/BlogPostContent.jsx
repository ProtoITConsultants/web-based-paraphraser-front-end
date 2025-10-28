import { normalizeDate } from "../api/blogs";

export default function BlogPostContent({ blog, isPreview = false }) {
  if (!blog) return null;

  const date = normalizeDate(blog.date);
  const formattedDate = date && !isNaN(date) 
    ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        {blog.category && (
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-gray-100 dark:bg-[#17191C] text-gray-900 dark:text-gray-300 rounded-full">
            {blog.category}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {blog.title}
        </h1>
        {blog.subtitle && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {blog.subtitle}
          </p>
        )}
        {formattedDate && (
          <time className="text-sm text-gray-500 dark:text-gray-500">
            {formattedDate}
          </time>
        )}
      </header>

      {/* Featured Image */}
      {blog.img && (
        <div className="mb-8 rounded-3xl overflow-hidden">
          <img 
            src={blog.img} 
            alt={blog.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Excerpt */}
      {blog.excerpt && (
        <div className="mb-8 p-6 bg-gray-50 dark:bg-[#17191C] rounded-3xl">
          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            {blog.excerpt}
          </p>
        </div>
      )}

      {/* Content Sections */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {(blog.sections || []).map((section, idx) => (
          <RenderSection key={idx} section={section} />
        ))}
      </div>
    </article>
  );
}

function RenderSection({ section }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
          {section.content}
        </h2>
      );

    case "paragraph":
      return (
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {renderParagraphWithLinks(section.content, section.links || [])}
        </p>
      );

    case "bullet-list":
      return (
        <ul className="list-disc list-inside mb-4 space-y-2">
          {(section.items || []).map((item, i) => (
            <li key={i} className="text-gray-700 dark:text-gray-300">
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-[#D2F159] pl-6 my-6 italic">
          <p className="text-gray-700 dark:text-gray-300 mb-2">"{section.content}"</p>
          {section.author && (
            <cite className="text-gray-600 dark:text-gray-400 not-italic">
              — {section.author}
            </cite>
          )}
        </blockquote>
      );

    case "table":
      return (
        <div className="my-6 overflow-x-auto">
          {section.title && (
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {section.title}
            </h3>
          )}
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-[#17191C]">
              <tr>
                {(section.headers || []).map((header, i) => (
                  <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(section.rows || []).map((row, i) => (
                <tr key={i} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "faq":
      return (
        <div className="my-6">
          {section.title && (
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {section.title}
            </h3>
          )}
          <div className="space-y-4">
            {(section.items || []).map((item, i) => (
              <details key={i} className="bg-gray-50 dark:bg-[#17191C] rounded-3xl p-4">
                <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">
                  {item.question}
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

function renderParagraphWithLinks(content, links) {
  if (!links || links.length === 0) return content;

  let result = content;
  links.forEach(link => {
    const placeholder = `{${link.text}}`;
    result = result.replace(
      placeholder,
      `<a href="${link.url}" class="text-[#D2F159] hover:underline" target="_blank" rel="noopener noreferrer">${link.text}</a>`
    );
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}
