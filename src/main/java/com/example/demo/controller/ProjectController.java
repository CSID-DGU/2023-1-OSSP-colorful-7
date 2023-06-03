package com.example.demo.controller;

import com.example.demo.domain.Project;
import com.example.demo.service.ProjectLikeService;
import com.example.demo.service.ProjectService;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class ProjectController {
    private ProjectService projectService;
    private ProjectLikeService projectLikeService;

    public ProjectController(ProjectService projectService) {this.projectService = projectService;}

    @PostMapping("/project/like")
    public String projectLike(HttpServletRequest request, Long projectId){
        projectLikeService.projectLike(request, projectId);
        return null;
    }

    @PostMapping("/project/create")
    public Project projectCreate(Project project){
        return projectService.insert(project);
    }

    @PostMapping("/project/delete")
    public void projectDelete(Long project_id){
        projectService.delete(project_id);
    }

    @GetMapping("/project/details")
    public Project findProject(Long project_id){
        return projectService.findByProjectId(project_id);
    }
}
