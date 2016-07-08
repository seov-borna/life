(function () {
	'use strict';

	function QuestCrudController(Story, Mission, Quest, $scope, $uibModalInstance, questbookObject) {
		var vm = this;

		vm.stories = Story.query();
		vm.missions = Mission.query();

		vm.newMission = null;
		vm.mission = null;
		vm.newQuest = null;
		vm.quest = null;

		vm.missionStatuses = null;
		vm.questTypes = null;

		activate();

		function activate() {
			if(questbookObject.objectType === 'QUEST') {
	        	vm.quest = new Quest(questbookObject);
	      	} else {
	      		vm.mission = new Mission(questbookObject);
	      	}

	      	vm.missionStatuses = ['UPCOMING', 'PRESENT', 'COMPLETE'];
	      	vm.questTypes = ['DEFAULT', 'DAILY', 'URGENT', 'IMPORTANT'];
		}

		vm.createQuest = function() {
			vm.newQuest = new Quest(vm.newQuest);
	      vm.newQuest.$save(function() {
	      	$uibModalInstance.close(vm.newQuest);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

		vm.updateQuest = function() {
	      vm.quest.$update(function() {
	        $uibModalInstance.close(vm.quest);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

	    vm.deleteQuest = function(){
	      vm.quest.$delete(function() {
	        $uibModalInstance.close(null);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

	    vm.refreshMissions = function(storyIndex) {
	    	vm.missions = vm.newQuest.story.missions;
	    }

	    $scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
	}

	angular
		.module('lifeApp')
		.controller('QuestCrudController', QuestCrudController);
})();