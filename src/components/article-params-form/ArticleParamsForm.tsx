import React, { useEffect, useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

interface FormProps {
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({ setArticleState }: FormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [isOpen]);

	const handleApply = () => {
		setArticleState(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}
					onReset={(e) => {
						e.preventDefault();
						handleReset();
					}}>
					<Text size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>
					<div className={styles.field}>
						<Text size={12} weight={800} uppercase>
							Шрифт
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									fontFamilyOption: option,
								}))
							}
						/>
					</div>
					<div className={styles.field}>
						<Text size={12} weight={800} uppercase>
							Размер шрифта
						</Text>
						<RadioGroup
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							name='fontSizeOption'
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									fontSizeOption: option,
								}))
							}
							title=''
						/>
					</div>
					<div className={styles.field}>
						<Text size={12} weight={800} uppercase>
							Цвет шрифта
						</Text>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									fontColor: option,
								}))
							}
						/>
					</div>
					<Separator />
					<div className={styles.field}>
						<Text size={12} weight={800} uppercase>
							Цвет фона
						</Text>
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									backgroundColor: option,
								}))
							}
						/>
					</div>
					<div className={styles.field}>
						<Text size={12} weight={800} uppercase>
							Ширина контента
						</Text>
						<RadioGroup
							options={contentWidthArr}
							selected={formState.contentWidth}
							name='contentWidth'
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									contentWidth: option,
								}))
							}
							title=''
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
