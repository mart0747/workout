'use strict'

angular.module('7minWorkout').controller('WorkoutController', function ($scope, $interval) {

    function Exercise(args) {
        this.name = args.name;
        this.title = args.title;
        this.description = args.description;
        this.image = args.image;
        this.related = {};
        this.related.videos = args.videos;
        this.nameSound = args.nameSound;
        this.procedure = args.procedure;
    }

    function WorkoutPlan(args) {
        this.exercises = [];
        this.name = args.name;
        this.title = args.title;
        this.restBetweenExercise = args.restBetweenExercise;
    }

    var restExercise;
    var workoutPlan;

    var startWorkout = function () {
        workoutPlan = createWorkout();
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: " Relax!",
                description: " Relax a bit!",
                image: "img/rest.png",
            }),
            duration: 10
        };
        startExercise(workoutPlan.exercises.shift());
    }

    var createWorkout = function () {
        var workout = new WorkoutPlan({
            name: "7minWorkout",
            title: "Seven Minute Workout",
            restBetweenExercise: 10
        });

        //populate a list of exercises. 
        //TODO: move this to a database. 
        workout.exercises.push({
            details: new Exercise({
                name: "jumpingJacks",
                title: "Jumping Jacks",
                description: "Jumping Jacks.",
                image: "img/JumpingJacks.png",
                videos: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
              details: new Exercise({
                  name: "squat",
                  title: "Squat",
                  description: "The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips, buttocks and quads.",
                  image: "img/squat.png",
                  videos: ["//www.youtube.com/embed/QKKZ9AGYTi4", "//www.youtube.com/embed/UXJrBgI2RxA"],
                  procedure: "Stand with your head facing forward and your chest held up and out.\
                              Place your feet shoulder-width apart or little wider. Extend your hands straight out in front of you.\
                              Sit back and down like you're sitting into a chair. Keep your head facing straight as your upper body bends forward a bit. Rather than allowing your back to round, let your lower back arch slightly as you go down.\
                              Lower down so your thighs are parallel to the floor, with your knees over your ankles. Press your weight back into your heels.\
                              Keep your body tight, and push through your heels to bring yourself back to the starting position."
              }),
              duration: 30
          });
          workout.exercises.push({
              details: new Exercise({
                  name: "tricepdips",
                  title: "Tricep Dips On Chair",
                  description: "A body weight exercise that targets triceps.",
                  image: "img/tricepdips.png",
                  videos: ["//www.youtube.com/embed/tKjcgfu44sI", "//www.youtube.com/embed/jox1rb5krQI"],
                  procedure: "Sit up on a chair. Your legs should be slightly extended, with your feet flat on the floor.\
                              Place your hands edges of the chair. Your palms should be down, fingertips pointing towards the floor.\
                              Without moving your legs, bring your glutes forward off the chair.\
                              Steadily lower yourself. When your elbows form 90 degrees angles, push yourself back up to starting position."
              }),
              duration: 30
          });
          workout.exercises.push({
              details: new Exercise({
                  name: "plank",
                  title: "Plank",
                  description: "The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that involves maintaining a difficult position for extended periods of time. ",
                  image: "img/Plank.png",
                  videos: ["//www.youtube.com/embed/pSHjTRCQxIw", "//www.youtube.com/embed/TvxNkmjdhMM"],
                  procedure: "Get into pushup position on the floor.\
                              Bend your elbows 90 degrees and rest your weight on your forearms.\
                              Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet.\
                              Hold this position."
              }),
              duration: 30
          });
          workout.exercises.push({
              details: new Exercise({
                  name: "highKnees",
                  title: "High Knees",
                  description: "A form exercise that develops strength and endurance of the hip flexors and quads and stretches the hip extensors.",
                  image: "img/highknees.png",
                  videos: ["//www.youtube.com/embed/OAJ_J3EZkdY", "//www.youtube.com/embed/8opcQdC-V-U"],
                  procedure: "Start standing with feet hip-width apart. \
                              Do inplace jog with your knees lifting as much as possible towards your chest."
              }),
              duration: 30
          });
          workout.exercises.push({
              details: new Exercise({
                  name: "lunges",
                  title: "Lunges",
                  description: "Lunges are a good exercise for strengthening, sculpting and building several muscles/muscle groups, including the quadriceps (or thighs), the gluteus maximus (or buttocks) as well as the hamstrings. ",
                  image: "img/lunges.png",
                  videos: ["//www.youtube.com/embed/Z2n58m2i4jg"],
                  procedure: "Stand erect with your feet about one shoulder width apart.\
                              Put your hands on your hips, keep your back as straight as possible, relax your shoulders and keep your eyes facing directly ahead.\
                              Take a large step forward with one leg.\
                              As you step forward, lower your hips and bend your knees until they both form 90 degree angles.\
                              Return to starting position.\
                              Repeat with your alternate leg."
              }),
              duration: 30
          });
          workout.exercises.push({
              details: new Exercise({
                  name: "pushupNRotate",
                  title: "Pushup And Rotate",
                  description: "A variation of pushup that requires you to rotate.",
                  image: "img/pushupNRotate.png",
                  videos: ["//www.youtube.com/embed/qHQ_E-f5278"],
                  procedure: "Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.\
                              Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling."
              }),
              duration: 30
          });
          workout.exercises.push({
              details: new Exercise({
                  name: "sidePlank",
                  title: "Side Plank",
                  description: "A variation to Plank done using one hand only",
                  image: "img/sideplank.png",
                  videos: ["//www.youtube.com/embed/wqzrb67Dwf8", "//www.youtube.com/embed/_rdfjFSFKMY"],
                  procedure: "Lie on your side, in a straight line from head to feet, resting on your forearm.\
                              Your elbow should be directly under your shoulder.\
                              With your abdominals gently contracted, lift your hips off the floor, maintaining the line.\
                              Keep your hips square and your neck in line with your spine. Hold the position."
              }),
              duration: 30
          });

        return workout;
    }

    var getNextExercise = function (currentExercisePlan) {
        var nextExercise = null;
        if (currentExercisePlan === restExercise) {
            nextExercise = workoutPlan.exercises.shift();
        } else { 
            if (workoutPlan.exercises.length != 0) {
                nextExercise = restExercise;       
            }
        }
        
        return nextExercise;
    }
    
    var startExercise = function (exercisePlan) {
        $scope.currentExercise = exercisePlan;
        $scope.currentExerciseDuration = 0;
        //interval calls the call back function, every X ms, Y # of times
        $interval(function () {
            ++$scope.currentExerciseDuration;
        }, 100, $scope.currentExercise.duration)
        .then(function() {
            var next = getNextExercise(exercisePlan);
            if (next) {
                startExercise(next);
            } else {
                console.log("Workout Complete!");
            }
        });
    }

    var init = function () {
        startWorkout();
    }

    init();
});