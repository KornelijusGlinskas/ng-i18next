import * as angular from 'angular';
import * as I18next from 'i18next';

import { Ii18nProvider } from 'interfaces';

import { I18nDirective } from './directive';
import { I18nBindOnceDirective } from './directiveBindOnce';
import { I18nDirectiveController } from './directiveController';
import { I18nFilter } from './filter';
import { I18nTranslateService } from './translateService';

declare var i18next: I18next.I18n;

class I18nProvider implements Ii18nProvider {
	translationOptions: I18next.TranslationOptions = {};

	constructor() {
		this.$get.$inject = ['$rootScope'];
	}

	$get = ($rootScope: ng.IRootScopeService): I18nTranslateService => {
		if (i18next) {
			return new I18nTranslateService($rootScope, this.translationOptions);
		} else {
			throw 'i18next is not loaded';
		}
	};
}

angular.module('jm.i18next', ['ng', 'ngSanitize'])
    .provider('$i18next', I18nProvider)
    .directive('ngI18next', I18nDirective.factory())
	.directive('boI18next', I18nBindOnceDirective.factory())
    .controller('NgI18nextController', I18nDirectiveController)
    .filter('i18next', I18nFilter.factory());

export default 'jm.i18next';
