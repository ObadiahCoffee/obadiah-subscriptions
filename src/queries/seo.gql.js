import { graphql } from 'gatsby';

export const Queries = graphql`
  fragment seoData on Query {
    prismicHome {
      data {
        meta_title {
          text
        }
        meta_description {
          text
        }
        ogImage: open_graph_image {
          url
        }
        schema {
          text
        }
      }
    }
  }
`;
