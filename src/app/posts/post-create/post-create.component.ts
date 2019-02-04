import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {

  post:Post= new Post();
  constructor(public postsService: PostsService) {}

  onAddPost() {
    console.log(this.post);
    this.postsService.addPost(this.post);
    this.post=new Post();
    // I am commenting it out . Because this is not how you check for the validity of the form. 
    // you should use reactive form for this validation. Like some of the lines you commented out in the .html file
    // if (form.invalid) {
    //   return;
    // }
    // this.postsService.addPost(
    //   form.value.statementDate,
    //   form.value.divorceDate,
    //   form.value.priorStatement,
    //   form.value.birthDate,
    //   form.value.otherBirthDate,
    //   form.value.marriageDate,
    //   form.value.separationDate,
    //   form.value.causeAction,
    //   form.value.custody,
    //   form.value.parentingTime,
    //   form.value.alimony,
    //   form.value.childSupport,
    //   form.value.equitableDistribution,
    //   form.value.counselFees,
    //   form.value.college,
    //   form.value.other,
    //   form.value.yourName,
    //   form.value.streetAddress,
    //   form.value.city,
    //   form.value.state,
    //   form.value.secondParty,
    //   form.value.secondAddress,
    //   form.value.secondCity,
    //   form.value.secondState,
    //   form.value.childOne,
    //   form.value.addressOne,
    //   form.value.birthOne,
    //   form.value.personOne,
    //   form.value.childTwo,
    //   form.value.addressTwo,
    //   form.value.birthTwo,
    //   form.value.personTwo,
    //   form.value.employerName,
    //   form.value.employerAddress,
    //   form.value.employerNameTwo,
    //   form.value.employerTwoAddress)

    // form.resetForm();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
