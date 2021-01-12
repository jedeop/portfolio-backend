use crate::auth::Service;

#[derive(sqlx::FromRow)]
pub struct UserOptional {
    pub user_id: String,
    pub name: Option<String>,
    pub avatar_url: Option<String>,
}
impl UserOptional {
    pub fn new(
        service: Service,
        user_id: String,
        name: Option<String>,
        avatar_url: Option<String>,
    ) -> Self {
        let user_id = format!(
            "{}{}",
            match service {
                Service::GOOGLE => "GOO",
            },
            user_id,
        );

        Self {
            user_id,
            name,
            avatar_url,
        }
    }
    pub fn to_user(self) -> User {
        User {
            user_id: self.user_id,
            name: self.name.unwrap_or("???".to_string()),
            avatar_url: self.avatar_url.unwrap_or("/api/noavatar".to_string()), // TODO: default avatar url
        }
    }
}

#[derive(sqlx::FromRow, Debug, serde::Serialize)]
pub struct User {
    pub user_id: String,
    pub name: String,
    pub avatar_url: String,
}