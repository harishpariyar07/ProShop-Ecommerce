import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keyword }) => {
    return (<Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keyword} />
    </Helmet>);
}

Meta.defaultProps = {
    title: 'Welcome to ProShop',
    description: 'electronic items sasto ma la hai!',
    keyword: 'electronics, electric items'
}

export default Meta;