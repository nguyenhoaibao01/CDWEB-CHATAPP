package com.cdweb.chatapp.service;

import com.cdweb.chatapp.Repository.TestModelRepository;
import com.cdweb.chatapp.model.TestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestModelService {
    @Autowired
    private TestModelRepository test;
    public TestModel add(TestModel testModel) {
        return test.save(testModel);
    }

    public List<TestModel> getAll() {
        return test.findAll();
    }
}
