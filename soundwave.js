var m_circleArr [];
var m_pulseTimer = 1;
var m_source = {0,0};
var m_sourceVelocity = {0.1, 0.1};
var m_elapsedTime = 0;

var s_speedThroughMedium = 1;
var s_frequency = 1;
var s_maxRadius = 20;

//SHIT VECTOR IMPL PLEASE REPLACE
function VectorAdd(a, b)
{
	return {a[0]+b[0], a[1]+b[1]};
}


function MoveSource(deltaTime) {
	m_source = VectorAdd(m_source, m_sourceVelocity * deltaTime);
}

function Update (deltaTime)
{
	m_elapsedTime += deltaTime;
	MoveSource(deltaTime);

	for (var i = 0; i < circle.length(); ++i)
	{
		circle[i]['radius'] += s_speedThroughMedium * deltaTime;
		if (circle[i]['radius'] >= s_maxRadius)
		{
			circle.pop(i);
			--i;
		}
	}

	pulseTimer -= deltaTime;
	if (pulseTimer < 0)
	{
		var circle = {
			'source' : m_source,
			'radius' : 0
		}
	}
	circleArr.push(circle);

	console.log(m_timeElapsed + ":" + circle);
}

function main () 
{
	var loopCount = 0;
	while (loopCount < 1000)
	{
		Update(0.1);
		loopCount ++;
	}
}

main();