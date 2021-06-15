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
          raw
        }
        header_title {
          html
          raw
        }
        header_description {
          html
          raw
        }
        coffee_1_altitude {
          html
          raw
        }
        coffee_1_harvest(formatString: "MMM YYYY")
        coffee_1_process {
          html
          raw
        }
        coffee_1_producer {
          html
          raw
        }
        coffee_1_read_more_cta {
          html
          raw
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
          raw
        }
        coffee_1_region {
          html
          raw
        }
        coffee_1_region_tagline {
          html
          raw
        }
        coffee_1_region_title {
          html
          raw
        }
        coffee_1_taste_notes {
          html
          raw
        }
        coffee_1_variety {
          html
          raw
        }
        coffee_2_altitude {
          html
          raw
        }
        coffee_2_harvest(formatString: "MMM YYYY")
        coffee_2_producer {
          html
          raw
        }
        coffee_2_process {
          html
          raw
        }
        coffee_2_read_more_cta {
          html
          raw
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
          raw
        }
        coffee_2_region {
          html
          raw
        }
        coffee_2_region_tagline {
          html
          raw
        }
        coffee_2_region_title {
          html
          raw
        }
        coffee_2_taste_notes {
          html
          raw
        }
        coffee_2_variety {
          html
          raw
        }
        coffees_title {
          html
          raw
        }
        subscription_cta_link {
          url
        }
        subscription_cta_text {
          html
          raw
        }
      }
    }
  }
`;
