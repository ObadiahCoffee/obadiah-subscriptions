import { graphql } from 'gatsby';

export const Queries = graphql`
  fragment IntroSectionPageFragment on PrismicPageBodyIntroSection {
    slice_type
    id
    primary {
      title {
        text
      }
      subtitle {
        html
      }
    }
  }
`;
