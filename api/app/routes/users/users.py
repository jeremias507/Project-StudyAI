from fastapi import APIRouter, HTTPException,Depends
from database.supabase_client import supabase
from schemas.users.users import SignUpRequest

user_router = APIRouter()


@user_router.post("/signup")
def signup(user: SignUpRequest):
   try:
      
        # validar contraseñas
        if user.password != user.confirm_password:
            raise HTTPException(
                status_code=400,
                detail="Passwords do not match"
            )

        # crear usuario en Supabase Auth
        response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password
        })

        if response.user is None:
            raise HTTPException(
                status_code=400,
                detail="Error creating user"
            )

        # guardar datos adicionales
        supabase.from_("users").insert({
            "id": response.user.id,
            "full_name": user.full_name,
            "email": user.email
        }).execute()

        return {
            "message": "Cuenta creada!",
        }
      
   except HTTPException as http_exc:
        
        raise http_exc
    
   except Exception as e:
        raise HTTPException(status_code=500, detail= str(e))

