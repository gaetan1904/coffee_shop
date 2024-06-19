import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/users.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // Aucun rôle requis spécifié, autorisation accordée
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assurez-vous que votre middleware a ajouté 'user' à la requête

    if (!user) {
      return false; // Pas d'utilisateur, refuser l'accès
    }

    return requiredRoles.includes(user.role); // Vérifie si le rôle de l'utilisateur est dans les rôles requis
  }
}
