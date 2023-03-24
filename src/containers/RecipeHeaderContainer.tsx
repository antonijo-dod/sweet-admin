import { Button } from '@/components'
import { PageHeading } from '@/components/ui'
import { ReactElement } from 'react'
import { useGetRecipeBySlug, useUpdateRecipeStatus } from '@/hooks/recipes'
import { useParams } from 'react-router-dom'

const RecipeHeaderContainer = (): ReactElement => {
  const { slug } = useParams<{ slug: string }>()
  const recipe = useGetRecipeBySlug(slug)
  const updateRecipeStatus = useUpdateRecipeStatus()

  const handlePublishRecipe = () => {
    updateRecipeStatus.mutate({
      recipeId: recipe.data.data.id,
      status: 'published'
    })
  }
  const handleUnpublishRecipe = () => {
    updateRecipeStatus.mutate({
      recipeId: recipe.data.data.id,
      status: 'draft'
    })
  }

  if (recipe.isLoading) return <div>Loading</div>
  if (recipe.isError) return <div>Error</div>
  return (
    <PageHeading title="Edit recipe" action={
      <>
        {recipe.data.data.status === 'draft' ? (
          <Button type="button" variant="primary" className="mr-2" onClick={handlePublishRecipe}>Publish</Button>
        ) : (
          <Button type="button" variant="primary" className="mr-2" onClick={handleUnpublishRecipe}>Draft</Button>
        )}
      </>
    } />
  )
}

export default RecipeHeaderContainer 
