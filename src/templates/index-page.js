import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import EndorsementForm from '../components/Form'
import Layout from '../components/Layout'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
//import Features from '../components/Features'
//import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({ image, topimage, title, description, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modalsign, setModalsign] = useState(false);
  const togglesign = () => setModalsign(!modalsign);
  return (


    <div className="center-this">
      <div className="full-site-image">

        <PreviewCompatibleImage
          imageInfo={{
            image: image.childImageSharp.fluid.src,
            alt: "this is the alt",
          }}
        />

      </div>

      <section className="mystuff inside-lg no-padd">
        <div>
          <PreviewCompatibleImage
            imageInfo={{
              image: topimage.childImageSharp.fluid.src,
              alt: "this is the alt",
            }}
          />
          <div className="buttons text-center">
            <Button color="warning" size="lg" onClick={toggle}>Learn More</Button>
            <Button color="warning" size="lg" onClick={togglesign}>Sign Up</Button>
          </div>
        </div>
      </section>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>

          <div className="modal-window">
            <div className="text-center">
              <h1 className="title">{title}</h1>
              <h3 className="subtitle">{description}</h3>
            </div>
            <div className="padding-10">
              <PageContent className="content" content={content} />
            </div>
          </div>

        </ModalBody>
      </Modal>

      <Modal isOpen={modalsign} toggle={togglesign} >
        <ModalHeader toggle={togglesign}></ModalHeader>
        <ModalBody>

          <div className="modal-window">
            <h1 className="title">Endorsement Form</h1>
            <EndorsementForm />
          </div>

        </ModalBody>
      </Modal>

    </div>


  )
}





IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  topimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
        topimage={frontmatter.topimage}
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
        topimage {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
      }
    }
  }
`
