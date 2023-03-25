package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.model.TestModel;
import com.cdweb.chatapp.service.TestModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("test")
public class TestModelController {
    @Autowired
    private TestModelService testModelService;



    @PostMapping("/addtest")
    public TestModel addTestModel(@RequestBody TestModel testModel) {
        return testModelService.add(testModel);
    }

    @GetMapping("/alltest")
    public List<TestModel> addTestModel() {
        return testModelService.getAll();
    }




}
