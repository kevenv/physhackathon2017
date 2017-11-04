var m_circleArr = [];
var m_pulseTimer = 1;
var m_source = new THREE.Vector3(0,0,0);
var m_sourceVelocity = new THREE.Vector3(2,2,0);
var m_elapsedTime = 0;

var s_speedThroughMedium = 1;
var s_frequency = 1;
var s_maxRadius = 10;

function Update (deltaTime)
{
	m_elapsedTime += deltaTime;

	// DO NOT REMOVE THESE THIS IS SO STUPID
	var temp = m_source.clone();
	var tempVel = m_sourceVelocity.clone();
	m_source.copy(temp.add(tempVel.multiplyScalar(deltaTime)));

	for (var i = 0; i < m_circleArr.length; ++i)
	{
		m_circleArr[i]['radius'] += s_speedThroughMedium * deltaTime;
		if (m_circleArr[i]['radius'] >= s_maxRadius)
		{
			m_circleArr.splice(i, 1);
			--i;
		}
	}

	m_pulseTimer -= deltaTime;
	if (m_pulseTimer < 0)
	{
		var circle = {
			'position' : m_source.clone(),
			'radius' : 0.01
		}
		m_circleArr.push(circle);
		m_pulseTimer = s_frequency;
	}
}