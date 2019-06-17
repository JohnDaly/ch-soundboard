// External Dependencies
import React from 'react'
import styled from 'styled-components'

// Internal Dependencies
import { AudioSpriteData } from 'src/boards/cheapHeat'
import { ALL_CATEGORIES } from 'src/constants/constants'

interface Props {
    config: { [key: string]: AudioSpriteData },
    onSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => any,
    selectedCategory?: string
    className?: string
}

export const CategorySelect: React.FC<Props> = ({
    config,
    onSelectCategory,
    selectedCategory = ALL_CATEGORIES,
    className
}) => {
    const categories = getCategoriesFromConfig(config)

    return (
        <div className={className}>
            <CategoryLabel label={'Category'} />
            <select onChange={onSelectCategory} value={selectedCategory}>
                {categories.map((category) => (
                    <CategorySelectOption
                        key={`category_${category}`}
                        category={category}
                    />
                ))}
            </select>
        </div>
    )
}

// ------------------------------
// Child Components
// ------------------------------

const CategorySelectOption: React.FC<{ category: string }> = ({ category }) => (
    <option value={category}>
        {category}
    </option>
)

const CategoryLabel = styled((props: { label: string, className?: string }) => (
    <span className={props.className}>{props.label}</span>
))`
    font-size: 12px;
    margin-right: 0.5rem;
`
CategoryLabel.displayName = 'CategoryLabel'

// ------------------------------
// Helpers
// ------------------------------

const getCategoriesFromConfig = (config: Props['config']) => {
    // We will keep a map of the categories, so that
    // it is easy to determine if we have already seen
    // a category before, as we iterate over the configuration
    const categoryMap: { [key: string]: string } = {}

    // Iterate over each item in the configuration, and
    // add the categories to the map
    const configKeys = Object.keys(config)
    for (const key of configKeys) {
        const audioSpriteData = config[key]
        const spriteCategories = audioSpriteData.categories || []
        for (const category of spriteCategories) {
            // Add the category to the map
            categoryMap[category] = category
        }
    }

    // Convert the keys in the map into an array
    const categoriesFromMap = Object.keys(categoryMap)
    return ['All', ...categoriesFromMap]
}