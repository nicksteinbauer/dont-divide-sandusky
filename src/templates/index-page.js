import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'

import Layout from '../components/Layout'
//import Features from '../components/Features'
//import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({ image, title, description, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (


    <div>
      <div
        className="full-site-image"
        style={{
          backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
          backgroundPosition: `center center`,
          backgroundAttachment: `fixed`,
        }}
      >

      </div>

      <section className="mystuff inside-xxl">
        <div className="padding-20">
          <h1 className="title">{title}</h1>
          <h3 className="subtitle">{description}</h3>
          <PageContent className="content" content={content} />
        </div>
      </section>


    </div>


  )
}





IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { markdownRemark: post } = data
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        description={frontmatter.description}
        contentComponent={HTMLContent}
        content={post.html}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
      }
    }
  }
`
