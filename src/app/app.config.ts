import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import Todo from './todo.analog';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter([{ path: '', component: Todo }], withComponentInputBinding()),
	],
};
