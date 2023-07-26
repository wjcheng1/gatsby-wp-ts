import { Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';
import * as styles from './grid.module.css';

const GradientPlaceholder = () => (
	<div className={styles.gradientPlaceholder} />
);

/**
 * A HOC that displays the Component as a grid
 * @param Component The component used to display the content
 * @returns Returns a grid of the Component mapped over data
 */
const withGrid = <DataType,>(Component: React.FC<{ content: DataType }>) => {
	/**
	 *
	 * @param params.data - the data to map into the grid
	 * @param params.FallbackComponent - a component to display if there is no data
	 * @returns the data in a Component in a grid
	 */
	const GridedComponent = <Props,>({
		data,
		FallbackComponent,
		...props
	}: {
		data?: DataType[];
		FallbackComponent?: React.FC;
	} & { [Property in keyof Props]: Props[Property] }) => {
		return (
			<div className={styles.container}>
				{data ? (
					data.map((content, i) => {
						return <Component key={i} content={content} {...props} />;
					})
				) : FallbackComponent ? (
					<FallbackComponent />
				) : null}
			</div>
		);
	};

	return GridedComponent;
};

/**
 * A generic GridItem
 */
const GridItem = ({
	href,
	imgSrc,
	altText,
	title,
}: {
	[key in 'href' | 'altText' | 'title']: string | null;
} & { imgSrc: IGatsbyImageData | null }) => {
	if (!href || !altText || !title) {
		return (
			<div className="shrink-0 h-40 relative">
				<GradientPlaceholder />
			</div>
		);
	}
	return (
		<Link
			to={href}
			className={`${styles.card} rounded-lg cursor-pointer overflow-x-hidden no-underline`}
		>
			<div className="shrink-0 h-40 relative">
				{imgSrc ? (
					<GatsbyImage
						image={imgSrc}
						style={{ height: '100%', width: '100%' }}
						objectFit="fill"
						alt={altText}
					/>
				) : (
					<GradientPlaceholder />
				)}
			</div>
			<h2 className={`${styles.cardTitle} font-semibold my-5 mx-4`}>
				{title} &rarr;
			</h2>
		</Link>
	);
};

/**
 * A grid item for WpPosts
 */
const PostGridItem = ({ content }: { content: Queries.WpPost }) => {
	const title = content?.title || '';
	const imgSrc =
		content?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData ||
		null;
	const altText = content?.featuredImage?.node.altText || title || '';
	const path = content?.uri || '';
	return (
		<GridItem
			href={`/posts${path}`}
			imgSrc={imgSrc}
			altText={altText}
			title={title}
		/>
	);
};

/**
 * A grid item for WpPages
 */
const PageGridItem = ({ content }: { content: Queries.WpPage }) => {
	const title = content?.title || '';
	const imgSrc =
		content?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData ||
		null;
	const altText = content?.featuredImage?.node.altText || title || '';
	const path = content?.uri || '';
	return (
		<GridItem
			href={`/pages${path}`}
			imgSrc={imgSrc}
			altText={altText}
			title={title}
		/>
	);
};

export const PostGrid = withGrid(PostGridItem);
export const PageGrid = withGrid(PageGridItem);
