import React from 'react';
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
} from 'src/constants/articleProps';

interface FormProps {
	isOpen: boolean;
	formState: any;
	setFormState: (state: any) => void;
	onApply: () => void;
	onReset: () => void;
	sidebarRef: React.RefObject<HTMLDivElement>;
	onArrowClick: () => void;
}

export const ArticleParamsForm = ({
	isOpen,
	formState,
	setFormState,
	onApply,
	onReset,
	sidebarRef,
	onArrowClick,
}: FormProps) => {
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply();
					}}
					onReset={(e) => {
						e.preventDefault();
						onReset();
					}}>
					<div className={styles.field}>
						<label htmlFor='fontFamilyOption'>Шрифт</label>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								setFormState((prev: any) => ({
									...prev,
									fontFamilyOption: option,
								}))
							}
						/>
					</div>
					<div className={styles.field}>
						<label>Размер шрифта</label>
						<RadioGroup
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							name='fontSizeOption'
							onChange={(option) =>
								setFormState((prev: any) => ({
									...prev,
									fontSizeOption: option,
								}))
							}
							title=''
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor='fontColor'>Цвет текста</label>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) =>
								setFormState((prev: any) => ({
									...prev,
									fontColor: option,
								}))
							}
						/>
					</div>
					<div className={styles.field}>
						<label>Ширина</label>
						<RadioGroup
							options={contentWidthArr}
							selected={formState.contentWidth}
							name='contentWidth'
							onChange={(option) =>
								setFormState((prev: any) => ({
									...prev,
									contentWidth: option,
								}))
							}
							title=''
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor='backgroundColor'>Цвет фона</label>
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								setFormState((prev: any) => ({
									...prev,
									backgroundColor: option,
								}))
							}
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
