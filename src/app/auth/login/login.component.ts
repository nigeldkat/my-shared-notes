import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //needed for reactive forms
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { AuthService } from '../auth.service'; 
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean = false;
  private loadingSubs: Subscription;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UIService, private router: Router) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe( 
      isLoading => {
        if(isLoading){
          this.isLoading = true;
        } else {
          this.isLoading = false;
        }
      });

      this.authSubscription = this.authService.authChange.subscribe(authStatus => {
        if(authStatus == true){
          this.router.navigate(['/notelist']);
        }
      })

    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }
  
  ngOnDestroy(){
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }    
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

  onSubmit() {
    //console.log(this.loginForm);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}