import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSidebarOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setSidebarOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [isSidebarOpen]);

	const handleApply = () => {
		setArticleState(formState);
		setSidebarOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setSidebarOpen(false);
	};

	const cssVars = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	};

	return (
		<main className={clsx(styles.main)} style={cssVars as CSSProperties}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				formState={formState}
				setFormState={setFormState}
				onApply={handleApply}
				onReset={handleReset}
				sidebarRef={sidebarRef}
				onArrowClick={() => setSidebarOpen(!isSidebarOpen)}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
