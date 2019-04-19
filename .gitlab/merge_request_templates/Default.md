Add a description of your merge request here. Merge requests without an adequate
description will not be reviewed until one is added.
<!--- Provide a general summary of the issue in the Title above -->

## Database Changes
<!-- Secion needa to be filled by the developer -->
- [ ] No Database changes (Skip section if checked)

### When adding a migration
- [ ] Migration written (both up and down)
- [ ] Added a `down` method so the migration can be reverted
- [ ] Any data migration has been considered
- [ ] Added tests for the migration in `spec/migrations` if necessary (e.g. when migrating data)

### When adding or modifying queries to improve performance:

- [ ] Included data that shows the performance improvement, preferably in the form of a benchmark

### When adding foreign keys to existing tables:

- [ ] Included a migration to remove orphaned rows in the source table before adding the foreign key
- [ ] Removed any instances of `dependent: ...` that may no longer be necessary

### When adding tables:

- [ ] Added indexes for fields that are used in statements such as WHERE, ORDER BY, GROUP BY, and JOINs

### When removing columns, tables, indexes or other structures:

- [ ] Removed these in a post-deployment migration
- [ ] Made sure the application no longer uses (or ignores) these structures

## Docker file changes

- [ ] No Dockerfile changes
- [ ] Docker file builds correctly
- [ ] All required enviroment vairibles have a default value
- [ ] All required ports are correctly exposed
- [ ] Package managers are not included in running stage

## Helm changes

- [ ] No Helm chart changes
- [ ] All development values initialise with kommander correctly 
- [ ] All Dependancies are updated to correct version
- [ ] Enviroment vairibles are set correctly
- [ ] All PVC are used as required and premissions resolved
- [ ] All application configuration files are held in config maps
- [ ] All passwords are held in secrets correctly
- [ ] All templates use `.yaml` extension
- [ ] Each resource is held in a seperate yaml file
- [ ] Template file name is named after resource type
- [ ] Templates are tabbed via 4 *spaces*
- [ ] Whitespace is minimalised
- [ ] Conform by the [naming conventions](https://docs.helm.sh/chart_best_practices/#naming-conventions)


## GitLab CI/CD Changes
<!-- GitLab CI/CD changes require management approval-->

- [ ] No Gitlab CI/CD changes 
- [ ] Documented discussion is available regarding changes
- [ ] Lead developer has been colsulted
- [ ] Stages are used correctly
- [ ] A global `OPTIONAL_DEPENDDANCY` vairible is used for optional tests
- [ ] Each task has a `_DISABLE` vairible where 1, it will disable the stage
- [ ] Changes are documented in MR
- [ ] Artifacts are used for testing output 
- [ ] Stage must complete inside 10 mins
- [ ] Tests are run in parallel where possible 
- [ ] `allow_failure` is used on non critical stages

## GitLab Template changes
<!-- ANy chnages here require manager approval -->
- [ ] No Gitlab template changes
- [ ] Documented discussion is available regarding changes
- [ ] Lead developer has been colsulted

## General Checklist
<!-- Can be completed by anyone however developer advised -->

- [ ] [Documentation created/updated](https://docs.gitlab.com/ee/development/doc_styleguide.html)
- [ ] Tests added for this feature/bug
- [ ] Conform by the [code review guidelines](https://docs.gitlab.com/ee/development/code_review.html)
- [ ] Conform by the [merge request performance guides](https://docs.gitlab.com/ee/development/merge_request_performance_guidelines.html)
- [ ] Conform by the [style guides](https://gitlab.com/gitlab-org/gitlab-ee/blob/master/CONTRIBUTING.md#style-guides)
- [ ] Internationalization required/considered

## Developer Review
<!-- Completed by the REVIEWING developer signing off the MR -->

- [ ] Check the MR WIP status is resolved
- [ ] Issue moved to `In dev review`
- [ ] Code runs as expected in local enviroment
- [ ] Code runs as expected in staging / review enviroment
- [ ] Code Adhears to required coding standards
- [ ] Code is not messy and is simple to understand
- [ ] Code is well commented and clear
- [ ] Code contains no security issues or concerns
- [ ] All SAST and DAST tests have been reviewed and evaluated
- [ ] Code correctly fulfills the linked tickets requirements
- [ ] Issue moved to `Dev Complete`
