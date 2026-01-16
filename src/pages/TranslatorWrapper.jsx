import { useOutletContext, useParams, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import Translator from "./Translator"
import { seoData } from "../data/seodata"

function findBySlug(data, slug) {
  if (!slug) return null

  return (
    data.find(item => {
      const lastSlug = item.url.split("/").pop()
      return lastSlug.includes(slug)
    }) || null
  )
}

export function TranslatorWrapper() {
  const { darkMode } = useOutletContext()
  const { slug } = useParams()
  const location = useLocation()

  const seo = findBySlug(seoData, slug)
  const pageUrl = `${window.location.origin}${location.pathname}`

  return (
    <>
      <Helmet>
        <title>{seo?.meta?.title || "AI Translation Tool"}</title>
        <meta
          name="description"
          content={
            seo?.meta?.description ||
            "Free AI-powered translation tool for fast and accurate language translation."
          }
        />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo?.meta?.title} />
        <meta property="og:description" content={seo?.meta?.description} />
      </Helmet>

      <Translator darkMode={darkMode} seo={seo} />
    </>
  )
}
