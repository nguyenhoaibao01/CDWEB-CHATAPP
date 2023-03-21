package com.cdweb.chatapp.Repository;

import com.cdweb.chatapp.model.TestModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestModelRepository extends JpaRepository<TestModel, Long> {
}
