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
    followers: number;

    constructor(private usersListService: UsersListService) { }

    ngOnInit(): void {
        this.getUsers();
        
    }

    getUsers() {
        this.usersListService.getAllUsers()
        .pipe(
            tap((users: Users[]) => {
                this.users = users;
            }),
            switchMap(users => {
                return of(users.forEach(user => {
                    this.getUserFollowers(user.login)
                    this.getUserRepo(user.login)
                }))
            })
        )
        .subscribe()
        
    }

    getUserFollowers(user: string){
        this.usersListService.getFollowers(user)
        .subscribe(followers => {
            this.followers = followers.length;
            console.log(this.followers)
        })
    }

    getUserRepo(user: string){
        this.usersListService.getRepositories(user)
        .subscribe(repo => {
            // this.followers = repo.length;
            console.log(repo)
        })
    }




}
