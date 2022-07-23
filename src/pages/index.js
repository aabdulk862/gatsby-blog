import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const BlogLink = styled(Link)`
  text-decoration: none;
`
const BlogTitle = styled.h3`
  margin-bottom: 20px;
`

const moreLinks = [
  {
    text: "Check out my Portfolio",
    url: "https://adam-abdulkadir.netlify.app/",
  },
]

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <div className={styles.textCenter}>
      <StaticImage
        src="../images/favicon.svg"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      />
      <h1>
        Welcome to <b>My Personal Blog!</b>
      </h1>
    </div>
    <div>
      <h2>Posts: {data.allMarkdownRemark.totalCount}</h2>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </BlogTitle>
          </BlogLink>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </div>
    {moreLinks.map((link, i) => (
      <React.Fragment key={link.url}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${link.url}${utmParameters}`}
        >
          {link.text}
        </a>
        {i !== moreLinks.length - 1 && <> · </>}
      </React.Fragment>
    ))}
  </Layout>
)

export default IndexPage
export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            title
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
