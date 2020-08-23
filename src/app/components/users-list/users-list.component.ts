import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersListService } from '../../services/users-list.service';
import { Users } from '../../models/users';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    user = {} as Users;
    users: Users[];
    login: string;
    followers: any;

    constructor(private usersListService: UsersListService) { }

    ngOnInit(): void {
        this.usersListService.getAllUsers;
        this.getUsers();

        

    }

    getUsers() {
        this.usersListService.getAllUsers()
        .pipe(
            tap((users: Users[]) => {
                this.users = users;
            }),
            switchMap((users: Users[]) => {
                return of(users.forEach(el => {
                this.getUsersFollowers(el.login)
                }))
            })
        )
        .subscribe(() => {
            console.log(this.followers)
        })
    }

    getUsersFollowers = (login: string) => {
        return this.usersListService.getFollowers(login)
        .pipe(
            tap(userFollower => {
                this.followers = userFollower
            })
        )
    }



}
