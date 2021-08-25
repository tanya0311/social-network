import React from "react"
import s from "./Paginator.module.css"

type PaginatorType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
}
export const Paginator = (props: PaginatorType) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
	let pages: Array<number> = []

	const createPages = (
		pages: Array<number>, //массив со страницами
		pagesCount: number, //количество стр
		currentPage: number //текущая
	) => {
		if (pagesCount > 10) {
			if (currentPage > 5) {
				for (let i = currentPage - 4; i <= currentPage + 5; i++) {
					pages.push(i)
					if (i === pagesCount) break
				}
			} else {
				for (let i = 1; i <= 10; i++) {
					pages.push(i)
					if (i === pagesCount) break
				}
			}
		} else {
			for (let i = 1; i <= pagesCount; i++) {
				pages.push(i)
			}
		}
	}

	createPages(pages, pagesCount, props.currentPage)

	return (
		<div>
			<div className={s.numberPage}>
				{pages.map((p) => (
					<span
						className={props.currentPage === p ? s.selectPage : s.buttonPage}
						onClick={() => props.onPageChanged(p)}
					>
						{p}
					</span>
				))}
			</div>
		</div>
	)
}
