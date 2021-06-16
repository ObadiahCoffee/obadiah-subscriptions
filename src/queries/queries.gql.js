import { graphql } from 'gatsby';

export const Queries = graphql`
  fragment homeData on Query {
    prismicHome {
      data {
        box_price_1
        box_price_2
        box_price_4
        checkout_tooltip {
          html
          text
        }
        header_title {
          html
          text
        }
        header_description {
          html
          text
        }
        coffee_1_altitude {
          html
          text
        }
        coffee_1_harvest(formatString: "MMM YYYY")
        coffee_1_process {
          html
          text
        }
        coffee_1_producer {
          html
          text
        }
        coffee_1_read_more_cta {
          html
          text
        }
        coffee_1_read_more_image {
          url
          alt
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90)
            }
          }
        }
        coffee_1_read_more_wysiwyg {
          html
          text
        }
        coffee_1_region {
          html
          text
        }
        coffee_1_region_tagline {
          html
          text
        }
        coffee_1_region_title {
          html
          text
        }
        coffee_1_taste_notes {
          html
          text
        }
        coffee_1_variety {
          html
          text
        }
        coffee_2_altitude {
          html
          text
        }
        coffee_2_harvest(formatString: "MMM YYYY")
        coffee_2_producer {
          html
          text
        }
        coffee_2_process {
          html
          text
        }
        coffee_2_read_more_cta {
          html
          text
        }
        coffee_2_read_more_image {
          url(imgixParams: {})
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90)
            }
          }
        }
        coffee_2_read_more_wysiwyg {
          html
          text
        }
        coffee_2_region {
          html
          text
        }
        coffee_2_region_tagline {
          html
          text
        }
        coffee_2_region_title {
          html
          text
        }
        coffee_2_taste_notes {
          html
          text
        }
        coffee_2_variety {
          html
          text
        }
        coffees_title {
          html
          text
        }
        subscription_cta_link {
          url
        }
        subscription_cta_text {
          html
          text
        }
      }
    }
  }
`;
