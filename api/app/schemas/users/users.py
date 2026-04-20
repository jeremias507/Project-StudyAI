from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional 

class SignUpRequest(BaseModel):
    full_name:str
    email: EmailStr
    password: str
    confirm_password: str
    


