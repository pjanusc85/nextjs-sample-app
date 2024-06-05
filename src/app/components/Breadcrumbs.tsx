import Link from "next/link";
import { BreadcrumbItem } from "../types/BreadcrumbItem";

type BreadcrumbProps = {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
    return (
        <nav className="text-sm font-medium py-6">
            <ol className="list-reset flex text-teal-600">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <Link href={ item.href } className={`hover:text-teal-500 ${index === items.length - 1 ? 'text-teal-500' : ''}`}>
                            {item.label}
                        </Link>
                        {index < items.length - 1 && (
                            <span className="mx-2">{'>'}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}