use async_graphql::{Context, FieldResult, Object};

use super::{post::Post, post::PostInput, post_group::PostGroup, post_group::PostGroupInput};
use crate::Database;

pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn create_post(&self, ctx: &Context<'_>, post: PostInput) -> FieldResult<Post> {
        let db = ctx.data::<Database>()?;
        let post = db.create_post(post).await?;

        Ok(post)
    }

    async fn create_post_group(
        &self,
        ctx: &Context<'_>,
        post_group: PostGroupInput,
    ) -> FieldResult<PostGroup> {
        let db = ctx.data::<Database>()?;
        let post_group = db.create_post_group(post_group).await?;

        Ok(post_group)
    }
}
