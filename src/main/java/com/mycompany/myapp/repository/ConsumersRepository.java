package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Consumers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Consumers entity.
 */

@Repository
public interface ConsumersRepository extends JpaRepository<Consumers, Long> {

}
