import { Link } from 'gatsby';
import { PrivatePosts } from '../../lib/types';
import Layout from '../components/layout';
import * as styles from './authApi.module.css';

const AuthApiExampleTemplate = ({
	pageContext: { privatePosts },
}: {
	pageContext: { privatePosts: PrivatePosts[] };
}) => {
	return (
		<Layout>
			<div className={styles.container}>
				<h1 className={styles.containerTitle}>API Authorization Example</h1>

				<Link
					className={`${styles.link} text-black font-medium underline`}
					to="/"
				>
					<span>Home &rarr;</span>
				</Link>

				<div className="mx-auto mt-12">
					{privatePosts?.length > 0 ? (
						<p className={styles.paragraph}>
							🎉 Gatsby was able to successfully make an authenticated request
							to WordPress! 🎉
						</p>
					) : (
						<>
							<p className={styles.paragraph}>
								Gatsby was unable to make an authorized request to the WordPress
								API. Please check your .env.development.local file to ensure
								that your <code>WP_APPLICATION_USERNAME</code> and{' '}
								<code>WP_APPLICATION_PASSWORD</code> are set correctly.
							</p>
							<p className={styles.paragraph}>
								For more information on how to set these values, please see{' '}
								<a href="https://decoupledkit.pantheon.io/docs/frontend-starters/gatsby/gatsby-wordpress/setting-environment-variables">
									Setting Environment Variables
								</a>
							</p>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default AuthApiExampleTemplate;
